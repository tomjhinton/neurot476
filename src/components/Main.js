import React from 'react'
import axios from 'axios'
const THREE = require('three')
import TweenMax from 'gsap'







class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.mouseMove.bind(this)






  }


  componentDidMount(){

    const mouse = new THREE.Vector2(0, 0)
        const scene = new THREE.Scene()
        scene.background = new THREE.Color( 0xffffff )
        scene.add( new THREE.AmbientLight( 0x666666 ) )
        const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 )
        camera.position.x=0
        camera.position.y=1
        camera.position.z=25
        scene.add( camera )
        const light = new THREE.DirectionalLight( 0xffffff, 0.5 )
        scene.add(light)
        const renderer = new THREE.WebGLRenderer({alpha: true})
        renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( renderer.domElement )
        const img =  new THREE.TextureLoader().load( './assets/texture.png')

        var planeGeom = new THREE.PlaneBufferGeometry(Math.PI * 5, Math.PI * 2.5, 36, 28);
  planeGeom.morphAttributes.position = [];

  var sphereFormation = [];
  var uvs = planeGeom.attributes.uv;
  var uv = new THREE.Vector2();
  var t = new THREE.Vector3();
  for (let i = 0; i < uvs.count; i++) {
    uv.fromBufferAttribute(uvs, i);
    //console.log(uv.clone())
    t.setFromSphericalCoords(
      2.5,
      Math.PI * (1 - uv.y),
      Math.PI * (uv.x - 0.5) * 2
    )
    sphereFormation.push(t.x, t.y, t.z);
  }
  planeGeom.morphAttributes.position[0] = new THREE.Float32BufferAttribute(sphereFormation, 3);

  var planeMat = new THREE.MeshBasicMaterial({
    map: img,
    morphTargets: true,
    side: THREE.DoubleSide
  });
  var spherePlane = new THREE.Mesh(planeGeom, planeMat);
  scene.add(spherePlane);
  spherePlane.morphTargetInfluences[0] = 0;

  var clock = new THREE.Clock();
        window.addEventListener('mousemove', (ev) => {
          onMouseMove(ev)
        })



        function onMouseMove(event) {
          TweenMax.to(mouse, 0.5, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
          })

          TweenMax.to(spherePlane.rotation, 0.5, {
            x: -mouse.y * 0.3,
            y: mouse.x * (Math.PI / 6)
          })


          // console.log(mouse.x)

        }



        function animate() {


  spherePlane.morphTargetInfluences[0] = Math.sin(clock.getElapsedTime()) * 0.5 + 0.5;
  console.log(spherePlane)
  spherePlane.rotation.x+=0.01
          /* render scene and camera */
          renderer.render(scene,camera)
          requestAnimationFrame(animate)
        }



        requestAnimationFrame(animate)
        console.log(planeGeom.attributes.position.array[0])
        console.log(planeGeom)



  }

  componentDidUpdate(){



  }

  mouseMove(e){

    //console.log(e)

    this.setState({bass: `${e.screenX /100000} ${e.screenY /100000} `, scale: `${e.screenY /2}` })
  }




  render() {



    return (
      <div onMouseMove={this.mouseMove} className="body">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
          <defs>
            <filter id="filter">
              <feTurbulence type="fractalNoise" baseFrequency={this.state.bass} numOctaves="5" result="warp"></feTurbulence>
              <feDisplacementMap xChannelSelector="R" yChannelSelector="B" scale={this.state.scale} in="SourceGraphic" in2="warpOffset" />
            </filter>

          </defs>
        </svg>
        <h1 className="text"  onMouseMove={this.mouseMove}>The intersection of art  and technology</h1>




      </div>




    )
  }
}
export default Main
