import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-lsystem',
  templateUrl: './lsystem.component.html',
  styleUrls: ['./lsystem.component.css']
})
export class LsystemComponent implements OnInit {
  axiom: string = 'F';
  rules: { [key: string]: string } = { 'F': 'FF+[+F-F-F]-[-F+F+F]' };
  iterations: number = 4;
  angle: number = 25;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor() { 
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
  }

  ngOnInit(): void {
    this.initThreeJS();
    this.generateTree();
  }

  initThreeJS(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('treeContainer')!.appendChild(this.renderer.domElement);
    this.camera.position.z = 100;
  }

  generateTree(): void {
    const axiom = this.axiom;
    const rules = this.rules;
    const iterations = this.iterations;
    const angle = this.angle;

    let currentString = axiom;
    for (let i = 0; i < iterations; i++) {
      let newString = '';
      for (let char of currentString) {
        newString += rules[char] || char;
      }
      currentString = newString;
    }

    this.drawLSystem(currentString, angle);
  }

  drawLSystem(lSystemString: string, angle: number): void {
    this.scene.clear();
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const points: THREE.Vector3[] = [];
    const stack: { position: THREE.Vector3, rotation: THREE.Euler }[] = [];

    let position = new THREE.Vector3(0, 0, 0);
    let rotation = new THREE.Euler(0, 0, 0);

    for (let char of lSystemString) {
      switch (char) {
        case 'F':
          const newPosition = position.clone().add(new THREE.Vector3(0, 10, 0).applyEuler(rotation));
          points.push(position.clone(), newPosition.clone());
          position = newPosition;
          break;
        case '+':
          rotation.z += THREE.MathUtils.degToRad(angle);
          break;
        case '-':
          rotation.z -= THREE.MathUtils.degToRad(angle);
          break;
        case '[':
          stack.push({ position: position.clone(), rotation: rotation.clone() });
          break;
        case ']':
          const popped = stack.pop();
          if (popped) {
            position = popped.position;
            rotation = popped.rotation;
          }
          break;
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(geometry, material);
    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }
}
