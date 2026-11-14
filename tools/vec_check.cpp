// Draws instruction frames with firmware/src/vec.h and compares each with the browser's picture.
// tools/export_frames.py builds and runs this to decide which frames can be stored as instructions.
// stdin, per frame:  u32 length, the instructions, 240*240*4 bytes of RGBA (the browser's picture)
// stdout, per frame: "<mean difference, % of full scale> <pixels off by more than 25%> <1 if it overflowed>"
#include <cstdio>
#include <cstdlib>
#include <vector>
#include "vec.h"

int main() {
  static vec::Canvas cv;
  const int N = vec::W * vec::H;
  cv.fb = (uint16_t*)calloc(N, 2);
  cv.acc = (float*)calloc(vec::STRIDE * (vec::H + 1), sizeof(float));
  for (auto& c : cv.clips) c = (uint8_t*)malloc(N);
  std::vector<uint8_t> ops, ref(N * 4);
  uint32_t len;
  while (fread(&len, 4, 1, stdin) == 1) {
    ops.resize(len);
    if (fread(ops.data(), 1, len, stdin) != len || fread(ref.data(), 1, ref.size(), stdin) != ref.size()) return 1;
    cv.play(ops.data(), len);
    double sum = 0; int far = 0;
    for (int i = 0; i < N; i++) {
      uint16_t v = cv.fb[i];
      int got[3] = {(v >> 11) << 3 | (v >> 13), ((v >> 5) & 63) << 2 | ((v >> 9) & 3), (v & 31) << 3 | ((v >> 2) & 7)};
      int want[3] = {(ref[i * 4] & 0xF8) | (ref[i * 4] >> 5), (ref[i * 4 + 1] & 0xFC) | (ref[i * 4 + 1] >> 6), (ref[i * 4 + 2] & 0xF8) | (ref[i * 4 + 2] >> 5)};
      int d = 0; for (int k = 0; k < 3; k++) d = abs(got[k] - want[k]) > d ? abs(got[k] - want[k]) : d;
      sum += d; far += d > 64;
    }
    printf("%.3f %d %d\n", sum / N / 2.55, far, cv.overflow ? 1 : 0);
  }
}
