"""Build the Waveshare ESP32-S3-LCD-1.3-C (case and prism cube) in Blender, with Lump on its screen, and render it.

    /Applications/Blender.app/Contents/MacOS/Blender -b -P design/device/build_device.py -- screen.png out.png [samples]

Dimensions are Waveshare's (mm): cube 25.4 x 25.4 x 25.5; case 33.1 wide, 50.55 deep, 36.9 tall. The screen lies flat under the
cube facing up, and the cube's half-silvered diagonal turns its picture toward the front, which is why he seems to float inside.
"""
import bpy, bmesh, math, os, sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SCREEN, OUT, SAMPLES = (args + ["design/device/screen_test.png", "design/device/device.png", "160"])[:3]
MM = 0.001
FRAMES, OFFSET = int(os.environ.get("FRAMES", 0)), int(os.environ.get("OFFSET", 0))    # an animated shot: how many frames, starting how far into the pictures
W, D, H = 33.1, 50.55, 36.9
CUBE, CUBE_H = 25.4, 25.5

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.scale_length = MM


def mat(name, build):
    m = bpy.data.materials.new(name); m.use_nodes = True
    n = m.node_tree.nodes; n.clear(); build(m.node_tree, n); return m


def principled(colour, rough, **kw):
    def build(t, n):
        b = n.new("ShaderNodeBsdfPrincipled"); o = n.new("ShaderNodeOutputMaterial")
        b.inputs["Base Color"].default_value = (*colour, 1); b.inputs["Roughness"].default_value = rough
        for k, v in kw.items(): b.inputs[k].default_value = v
        t.links.new(b.outputs[0], o.inputs[0])
    return build


def box(name, size, at):
    bpy.ops.mesh.primitive_cube_add(size=1, location=at); o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True); return o


def cut(target, cutter):
    m = target.modifiers.new("cut", "BOOLEAN"); m.object = cutter; m.solver = "EXACT"
    bpy.context.view_layer.objects.active = target; bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(cutter)


def prism(name, outline, axis, lo, hi):
    """A solid from a flat outline pushed along x (outline in y, z) or along y (outline in x, z)."""
    bm = bmesh.new()
    place = (lambda a, b, t: (t, a, b)) if axis == "x" else (lambda a, b, t: (a, t, b))
    near = [bm.verts.new(place(a, b, lo)) for a, b in outline]; far = [bm.verts.new(place(a, b, hi)) for a, b in outline]
    bm.faces.new(near); bm.faces.new(reversed(far))
    for i in range(len(outline)):
        k = (i + 1) % len(outline); bm.faces.new((near[k], near[i], far[i], far[k]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); scene.collection.objects.link(o); return o


def join(parts):
    bpy.ops.object.select_all(action="DESELECT")
    for o in parts: o.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]; bpy.ops.object.join(); return parts[0]


# ---- the case, from photos of the real one: a flat front panel, a deck the cube sits on, and two side fins that rise
# behind the cube's front edge and run down to the back ----
SEAT, FIN, FOOT = 31.0, 2.7, 3.6                 # the deck's height, a fin's thickness, how far the body clears the desk
cy = 1.6 + CUBE / 2                              # the cube stands almost flush with the front
TILT = math.radians(16)                          # the panel, deck, screen and cube lean back; the fins stand on the desk
fin = [(-1.5, 0), (-1.5, 2), (6.6, 31.6), (38.5, 22.6), (D, 3.5), (D, 0)]       # its top edge runs along the cube's base, sloping down to the back
fins = [prism("fin", fin, "x", sx * W / 2, sx * (W / 2 - FIN)) for sx in (-1, 1)]
for f in fins:
    for y in (22.5, 27, 31.5):                                                       # three slashes low on each side, and a small notch behind them
        cut(f, prism("vent", [(y, 8.6), (y + 2.3, 8.6), (y - 1.2, 14), (y - 3.5, 14)], "x", -W, W))
    cut(f, prism("vent", [(34.2, 14), (38.4, 14), (36.3, 10.6)], "x", -W, W))
body = box("body", (W - 2 * FIN + 0.2, 31, SEAT - FOOT), (0, 15.5, FOOT + (SEAT - FOOT) / 2))
cut(body, box("recess", (W - 2 * FIN - 1.2, 3, 5.2), (0, 0, FOOT + 2.2)))            # the set-back strip along the bottom of the front
cut(body, prism("logo", [(-5.6, 22.6), (0, 19.2), (5.6, 22.6), (5.6, 21.2), (0, 17.4), (-5.6, 21.2)], "y", -1, 1.1))
cut(body, box("screen_well", (24.4, 24.4, 3), (0, cy, SEAT)))
board = box("board", (W - 2 * FIN - 0.6, 26, 1.6), (0, 38, 14)); board.rotation_euler = (math.radians(-38), 0, 0)   # what shows through the open back
case = join([*fins, board])
b = case.modifiers.new("bevel", "BEVEL"); b.width = 0.45; b.segments = 3; b.limit_method = "ANGLE"; b.angle_limit = math.radians(40)
plastic = mat("case plastic", principled((0.014, 0.014, 0.015), 0.46))
for o in (case, body):
    o.data.materials.clear(); o.data.materials.append(plastic)
b2 = body.modifiers.new("bevel", "BEVEL"); b2.width = 0.45; b2.segments = 3; b2.limit_method = "ANGLE"; b2.angle_limit = math.radians(40)
nt = plastic.node_tree                                                               # the fine moulded grain
noise = nt.nodes.new("ShaderNodeTexNoise"); noise.inputs["Scale"].default_value = 900; bump = nt.nodes.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.08
nt.links.new(noise.outputs[0], bump.inputs["Height"]); nt.links.new(bump.outputs[0], nt.nodes["Principled BSDF"].inputs["Normal"])

# ---- the screen: 23.4 mm square, flat, facing up, with the backlight that leaks round its edge ----
z_screen = SEAT - 0.9
bpy.ops.mesh.primitive_plane_add(size=23.4, location=(0, cy, z_screen)); lcd = bpy.context.object; lcd.name = "screen"


def screen_mat(t, n):
    tex = n.new("ShaderNodeTexImage"); tex.image = bpy.data.images.load(os.path.abspath(SCREEN)); tex.extension = "CLIP"; tex.name = "picture"
    if FRAMES:                                   # SCREEN is the first of a numbered run of pictures: play them, one a frame
        tex.image.source = "SEQUENCE"; u = tex.image_user; u.frame_duration = FRAMES; u.frame_start = 1; u.frame_offset = OFFSET; u.use_auto_refresh = True
    e = n.new("ShaderNodeEmission"); e.inputs["Strength"].default_value = 2.8; o = n.new("ShaderNodeOutputMaterial")
    t.links.new(tex.outputs["Color"], e.inputs["Color"]); t.links.new(e.outputs[0], o.inputs[0])


def glow(colour, strength):
    def build(t, n):
        e = n.new("ShaderNodeEmission"); e.inputs["Color"].default_value = (*colour, 1); e.inputs["Strength"].default_value = strength
        t.links.new(e.outputs[0], n.new("ShaderNodeOutputMaterial").inputs[0])
    return build


lcd.data.materials.append(mat("screen", screen_mat))
lcd.rotation_euler = (0, 0, math.pi); lcd.scale.x = -1                               # so his feet come out at the bottom of the reflection, and left stays left
leak = box("backlight leak", (24.0, 0.35, 0.25), (0, cy - 12.1, z_screen + 0.1)); leak.data.materials.append(mat("leak", glow((0.25, 0.4, 1.0), 3.0)))

# ---- the cube: clear front, back, top and bottom, frosted sides, and a half-silvered diagonal from its top front edge to its bottom back edge ----
z0 = SEAT
glass = box("cube", (CUBE, CUBE, CUBE_H), (0, cy, z0 + CUBE_H / 2))
gb = glass.modifiers.new("bevel", "BEVEL"); gb.width = 0.3; gb.segments = 2


def glass_mat(rough):
    def build(t, n):
        g = n.new("ShaderNodeBsdfGlass"); g.inputs["IOR"].default_value = 1.517; g.inputs["Roughness"].default_value = rough
        t.links.new(g.outputs[0], n.new("ShaderNodeOutputMaterial").inputs[0])
    return build


glass.data.materials.append(mat("glass", glass_mat(0.0))); glass.data.materials.append(mat("ground glass", glass_mat(0.8)))
for f in glass.data.polygons:
    if abs(f.normal.x) > 0.9: f.material_index = 1
bm = bmesh.new(); h = CUBE / 2 - 0.35
vs = [bm.verts.new(q) for q in ((-h, cy - h, z0 + CUBE_H - 0.35), (h, cy - h, z0 + CUBE_H - 0.35), (h, cy + h, z0 + 0.35), (-h, cy + h, z0 + 0.35))]
bm.faces.new(vs); me = bpy.data.meshes.new("mirror"); bm.to_mesh(me); bm.free()
mirror = bpy.data.objects.new("half mirror", me); scene.collection.objects.link(mirror)


def half_silvered(t, n):
    g = n.new("ShaderNodeBsdfGlossy"); g.inputs["Roughness"].default_value = 0.0; tr = n.new("ShaderNodeBsdfTransparent")
    mix = n.new("ShaderNodeMixShader"); mix.inputs[0].default_value = 0.5; o = n.new("ShaderNodeOutputMaterial")
    t.links.new(g.outputs[0], mix.inputs[1]); t.links.new(tr.outputs[0], mix.inputs[2]); t.links.new(mix.outputs[0], o.inputs[0])


mirror.data.materials.append(mat("half mirror", half_silvered))

from mathutils import Matrix
lean = Matrix.Translation((0, 0, FOOT)) @ Matrix.Rotation(-TILT, 4, "X") @ Matrix.Translation((0, 0, -FOOT))
for o in (body, lcd, leak, glass, mirror): o.matrix_world = lean @ o.matrix_world

# ---- the desk he lives on: oak, a monitor and keyboard out of focus behind, a mug, his cable ----
def oak(t, n):
    b = n.new("ShaderNodeBsdfPrincipled"); o = n.new("ShaderNodeOutputMaterial"); co = n.new("ShaderNodeTexCoord"); mp = n.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (0.006, 0.11, 0.11); mp.inputs["Rotation"].default_value = (0, 0, 0.25)
    grain = n.new("ShaderNodeTexNoise"); grain.inputs["Scale"].default_value = 1.6; grain.inputs["Detail"].default_value = 13; grain.inputs["Roughness"].default_value = 0.62
    ramp = n.new("ShaderNodeValToRGB"); ramp.color_ramp.elements[0].position = 0.34; ramp.color_ramp.elements[0].color = (0.2, 0.115, 0.05, 1)
    ramp.color_ramp.elements[1].position = 0.7; ramp.color_ramp.elements[1].color = (0.5, 0.33, 0.17, 1)
    bump = n.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.12; b.inputs["Roughness"].default_value = 0.36
    t.links.new(co.outputs["Object"], mp.inputs["Vector"]); t.links.new(mp.outputs[0], grain.inputs["Vector"]); t.links.new(grain.outputs["Fac"], ramp.inputs[0])
    t.links.new(ramp.outputs[0], b.inputs["Base Color"]); t.links.new(grain.outputs["Fac"], bump.inputs["Height"]); t.links.new(bump.outputs[0], b.inputs["Normal"])
    t.links.new(b.outputs[0], o.inputs[0])


bpy.ops.mesh.primitive_plane_add(size=3000, location=(0, 600, 0)); desk = bpy.context.object; desk.name = "desk"; desk.data.materials.append(mat("oak", oak))
dark = mat("dark metal", principled((0.03, 0.03, 0.035), 0.3, Metallic=0.8))
monitor = box("monitor", (620, 14, 360), (150, 520, 260)); monitor.data.materials.append(dark)
stand = box("stand", (120, 90, 80), (150, 540, 40)); stand.data.materials.append(dark)


def code_glow(t, n):                              # a dark editor with soft lines of colour: only ever seen out of focus
    co = n.new("ShaderNodeTexCoord"); mp = n.new("ShaderNodeMapping"); mp.inputs["Scale"].default_value = (2.2, 1, 38)
    lines = n.new("ShaderNodeTexNoise"); lines.inputs["Scale"].default_value = 3.0; ramp = n.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.52; ramp.color_ramp.elements[0].color = (0.012, 0.015, 0.03, 1); ramp.color_ramp.elements[1].position = 0.62; ramp.color_ramp.elements[1].color = (0.35, 0.55, 0.9, 1)
    e = n.new("ShaderNodeEmission"); e.inputs["Strength"].default_value = 1.4
    t.links.new(co.outputs["Object"], mp.inputs["Vector"]); t.links.new(mp.outputs[0], lines.inputs["Vector"]); t.links.new(lines.outputs["Fac"], ramp.inputs[0])
    t.links.new(ramp.outputs[0], e.inputs["Color"]); t.links.new(e.outputs[0], n.new("ShaderNodeOutputMaterial").inputs[0])


panel = box("monitor picture", (590, 1, 330), (150, 512.4, 262)); panel.data.materials.append(mat("code", code_glow))
keys = mat("keys", principled((0.05, 0.05, 0.055), 0.5))
kb = box("keyboard", (300, 110, 9), (190, 300, 4.5)); kb.data.materials.append(dark)
for r in range(5):
    for c in range(15):
        k = box("key", (16.5, 16.5, 5), (190 - 140 + c * 19.5 + 9, 300 - 44 + r * 19.5 + 6, 11)); k.data.materials.append(keys)
bpy.ops.mesh.primitive_cylinder_add(radius=41, depth=95, location=(-230, 330, 47.5), vertices=64); mug = bpy.context.object; mug.name = "mug"
mug.data.materials.append(mat("mug", principled((0.75, 0.72, 0.66), 0.25)))
for q in mug.data.polygons: q.use_smooth = True
book = box("notebook", (150, 205, 11), (-150, 150, 5.5)); book.rotation_euler = (0, 0, math.radians(-14)); book.data.materials.append(mat("cover", principled((0.1, 0.16, 0.24), 0.55)))
pages = box("pages", (146, 201, 8), (-149, 149, 5.6)); pages.rotation_euler = book.rotation_euler; pages.data.materials.append(mat("paper", principled((0.86, 0.84, 0.78), 0.7)))
bpy.ops.mesh.primitive_cylinder_add(radius=4.2, depth=140, location=(-118, 118, 15.5), rotation=(math.radians(90), 0, math.radians(52)), vertices=32); pen = bpy.context.object; pen.name = "pen"
pen.data.materials.append(mat("pen", principled((0.75, 0.55, 0.12), 0.25, Metallic=0.9)))
for q in pen.data.polygons: q.use_smooth = True
curve = bpy.data.curves.new("cable", "CURVE"); curve.dimensions = "3D"; curve.bevel_depth = 1.7; curve.bevel_resolution = 6
sp = curve.splines.new("BEZIER"); sp.bezier_points.add(3)
for bp, at in zip(sp.bezier_points, ((0, 42, 13), (6, 75, 3), (70, 140, 2), (260, 190, 2))):
    bp.co = at; bp.handle_left_type = bp.handle_right_type = "AUTO"
cable = bpy.data.objects.new("cable", curve); scene.collection.objects.link(cable); cable.data.materials.append(mat("cable", principled((0.02, 0.02, 0.02), 0.5)))
plug = box("plug", (11.5, 20, 6.5), (0, 46, 13.5)); plug.rotation_euler = (math.radians(-16), 0, 0); plug.data.materials.append(cable.data.materials[0])

world = bpy.data.worlds.new("room"); scene.world = world; world.use_nodes = True
wn = world.node_tree; env = wn.nodes.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(os.path.join(bpy.utils.resource_path("LOCAL"), "datafiles", "studiolights", "world", "interior.exr"))
wn.links.new(env.outputs[0], wn.nodes["Background"].inputs[0]); wn.nodes["Background"].inputs[1].default_value = 0.22


def light(name, at, size, watts, colour, aim=(0, 25, 30)):
    d = bpy.data.lights.new(name, "AREA"); d.size = size; d.energy = watts; d.color = colour
    o = bpy.data.objects.new(name, d); scene.collection.objects.link(o); o.location = at
    o.rotation_euler = (Vector(aim) - Vector(at)).to_track_quat("-Z", "Y").to_euler(); return o


# the time of day: room brightness, the window (where, how strong, what colour), and how bright the monitor behind is
TIMES = {"dawn": (0.03, (-420, -60, 330), 5e4, (0.5, 0.62, 1.0), 0.0), "morning": (0.2, (-460, -90, 240), 1.1e6, (1.0, 0.82, 0.6), 0.6),
         "day": (0.22, (-420, -60, 330), 9e5, (1.0, 0.86, 0.68), 1.0), "golden": (0.13, (-500, -60, 140), 1.5e6, (1.0, 0.58, 0.28), 0.7),
         "night": (0.012, (-420, -60, 330), 2.5e4, (0.4, 0.5, 1.0), 0.0)}
window = light("window", (-420, -60, 330), 300, 1, (1, 1, 1)); spill = light("monitor spill", (150, 430, 230), 300, 1, (0.55, 0.7, 1.0), aim=(0, 0, 20))
glow_node = [n for n in panel.data.materials[0].node_tree.nodes if n.type == "EMISSION"][0]


def time_of_day(name, frame=None):
    """Set the room to a time of day; with a frame, key it there, so a shot given "dawn>morning" changes as it plays."""
    room, sun_at, sun, sun_colour, screen_on = TIMES[name]
    wn.nodes["Background"].inputs[1].default_value = room; window.location = sun_at; window.data.energy = sun; window.data.color = sun_colour
    window.rotation_euler = (Vector((0, 25, 30)) - Vector(sun_at)).to_track_quat("-Z", "Y").to_euler()
    spill.data.energy = 1.6e5 * screen_on; glow_node.inputs["Strength"].default_value = 1.4 * screen_on + 0.01
    if frame is None: return
    wn.nodes["Background"].inputs[1].keyframe_insert("default_value", frame=frame); glow_node.inputs["Strength"].keyframe_insert("default_value", frame=frame)
    for o, what in ((window, "location"), (window, "rotation_euler"), (window.data, "energy"), (window.data, "color"), (spill.data, "energy")): o.keyframe_insert(what, frame=frame)


LIGHT = os.environ.get("LIGHT", "day").split(">")
time_of_day(LIGHT[0])
cam_d = bpy.data.cameras.new("camera"); cam_d.lens = float(os.environ.get("LENS", 85)); cam_d.sensor_width = 36; cam_d.dof.use_dof = True; cam_d.dof.aperture_fstop = 0.010       # f/10 at this scene's scale, where a unit is a millimetre
cam = bpy.data.objects.new("camera", cam_d); scene.collection.objects.link(cam); scene.camera = cam
cam.location = Vector([float(v) for v in os.environ.get("CAM", "-70,-225,62").split(",")]); target = Vector([float(v) for v in os.environ.get("AIM", f"0,{cy + 6},30").split(",")]); cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
sharp = bpy.data.objects.new("focus", None); scene.collection.objects.link(sharp); sharp.location = (0, 34, 45); cam_d.dof.focus_object = sharp      # on his picture, which floats near the back of the cube, wherever the camera goes; cam_d.clip_start = 1; cam_d.clip_end = 5000

device = bpy.data.objects.new("device", None); scene.collection.objects.link(device)      # the whole thing, so a tap on the glass can jolt it
for o in (case, body, lcd, leak, glass, mirror, plug): o.parent = device
for start in [int(v) for v in os.environ.get("SHAKES", "").split(",") if v]:                 # frames at which it is tapped: a quick knock that dies away
    for k in range(9):
        swing = (0 if k == 8 else math.radians(1.7) * (-1) ** k * math.exp(-k / 2.6))
        device.rotation_euler = (swing * 0.5, 0, swing); device.location = (0, abs(swing) * 22, 0)
        device.keyframe_insert("rotation_euler", frame=start + k); device.keyframe_insert("location", frame=start + k)
    device.rotation_euler = (0, 0, 0); device.location = (0, 0, 0)
    device.keyframe_insert("rotation_euler", frame=max(1, start - 1)); device.keyframe_insert("location", frame=max(1, start - 1))

scene.render.engine = "CYCLES"; scene.cycles.samples = int(SAMPLES); scene.cycles.use_denoising = True
scene.cycles.max_bounces = 16; scene.cycles.glossy_bounces = 12; scene.cycles.transmission_bounces = 16; scene.cycles.transparent_max_bounces = 16
prefs = bpy.context.preferences.addons["cycles"].preferences
try:
    prefs.compute_device_type = "METAL"; prefs.get_devices()
    for d in prefs.devices: d.use = True
    scene.cycles.device = "GPU"
except Exception: pass
scene.render.resolution_x, scene.render.resolution_y = 1280, 960
scene.view_settings.view_transform = "Standard"
scene.render.filepath = os.path.abspath(OUT)
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath("design/device/device.blend"))
if FRAMES:                                       # a slow drift round the front while he plays
    aim = bpy.data.objects.new("aim", None); scene.collection.objects.link(aim); aim.location = target
    cam.rotation_euler = (0, 0, 0); tc = cam.constraints.new("TRACK_TO"); tc.target = aim; tc.track_axis = "TRACK_NEGATIVE_Z"; tc.up_axis = "UP_Y"
    scene.frame_start, scene.frame_end = 1, FRAMES
    if len(LIGHT) > 1: time_of_day(LIGHT[0], 1); time_of_day(LIGHT[1], FRAMES)
    looks = [[float(v) for v in k.split(",")] for k in os.environ.get("AIMS", "").split("|") if k]      # where the camera points, if that moves too
    for i, at in enumerate(looks):
        aim.location = at; aim.keyframe_insert("location", frame=1 + round(i * (FRAMES - 1) / max(1, len(looks) - 1)))
    path = [[float(v) for v in k.split(",")] for k in os.environ.get("CAMS", "-78,-168,52|58,-182,74").split("|")]      # where the camera goes, evenly spaced through the shot
    for i, at in enumerate(path):
        cam.location = at; cam.keyframe_insert("location", frame=1 + round(i * (FRAMES - 1) / max(1, len(path) - 1)))
    scene.render.fps = int(os.environ.get("FPS", 24))
    scene.render.resolution_x, scene.render.resolution_y = [int(v) for v in os.environ.get("RES", "960x720").split("x")]
    scene.render.image_settings.file_format = "PNG"; scene.render.filepath = os.path.abspath(OUT) + "/f"
    scene.render.use_overwrite = False                # so a shot that was cut short picks up where it stopped
    bpy.ops.render.render(animation=True)
else:
    if "RES" in os.environ: scene.render.resolution_x, scene.render.resolution_y = [int(v) for v in os.environ["RES"].split("x")]
    bpy.ops.render.render(write_still=True)
