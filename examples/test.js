import voxelToMesh from '../src/voxelToMesh'

var canvas = document.getElementById("renderCanvas")
var engine = new BABYLON.Engine(canvas, true)

var createScene = function() {
  var scene = new BABYLON.Scene(engine)

  //var light = new BABYLON.DirectionalLight("direct", new BABYLON.Vector3(0, 0, 1), scene)
  var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene)

  var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene)
  camera.setPosition(new BABYLON.Vector3(0, 5, -30))
  camera.attachControl(canvas, true)

  //Create a custom mesh
  var customMesh = new BABYLON.Mesh("custom", scene)

  //x,y,z,color
  var voxels = [
    [1, 1, 1, [0,0,0,1]],
    [1, 1, 0, [255, 0, 0, 1]],
    [0, 1, 1, [0, 255, 0, 1]],
    [0, 1, 0, [0, 0, 255, 1]],
    [0, 1, 0, [255, 0, 255, 1]],
    [1, 0, 1, [0, 255, 0, 1]]
  ]

  const mesh = voxelToMesh(voxels)
  var positions = mesh.vertices
  var indices = mesh.indices
  var colors = mesh.colors

  //Empty array to contain calculated values
  var normals = []

  var vertexData = new BABYLON.VertexData()
  BABYLON.VertexData.ComputeNormals(positions, indices, normals)

  //Assign positions, indices and normals to vertexData
  vertexData.positions = positions
  vertexData.indices = indices
  vertexData.normals = normals
  vertexData.colors = colors

  //Apply vertexData to custom mesh
  vertexData.applyToMesh(customMesh)

  var material = new BABYLON.StandardMaterial('material01', scene)
  customMesh.material = material
  material.backFaceCulling = true
  material.wireframe = true

  return scene
}

var scene = createScene()

engine.runRenderLoop(function() {
  scene.render()
})

// Resize
window.addEventListener("resize", function() {
  engine.resize()
})
