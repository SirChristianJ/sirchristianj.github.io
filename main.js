import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.module.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas') });
const explodingText = document.getElementById('explodingText');
const text = explodingText.innerText;

// Clear the current text
explodingText.innerHTML = '';

// Split text into individual spans for each letter
text.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char === ' ' ? '\u00A0' : char; // Handle spaces properly
    span.style.setProperty('--randomX', Math.random());
    span.style.setProperty('--randomY', Math.random());
    explodingText.appendChild(span);
});

explodingText.addEventListener('mouseenter', () => {
    explodingText.querySelectorAll('span').forEach(span => {
        span.classList.add('exploded');
    });
});

// Optionally: Reset the text after the explosion effect is done
explodingText.addEventListener('mouseleave', () => {
    setTimeout(() => {
        explodingText.querySelectorAll('span').forEach(span => {
            span.classList.remove('exploded');
        });
    }, 500); // Adjust delay to match the transition duration
});


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );

let rotationSpeed = 0.1;

window.addEventListener('scroll', function (event) {
    const scrollY = window.scrollY;

    line.rotation.x += scrollY * rotationSpeed;
})
camera.position.z = 5;

function animate() {
    line.rotation.y += 0.01;
	requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();