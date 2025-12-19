'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import { Object3D, MathUtils } from 'three'
import { SkeletonUtils } from 'three-stdlib'

export default function RobotArm() {
  const { scene } = useGLTF('/models/robot-arm-animated.glb')
  const { gl } = useThree()

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const bones = useRef<{
    base?: Object3D
    firstHand?: Object3D
    secondHand?: Object3D
    holderRotator?: Object3D
    wireTop?: Object3D
  }>({})

  // Store the REST POSE rotations so we don't snap the robot to 0,0,0
  const initialRotations = useRef<{
    base: { x: number, y: number, z: number }
    firstHand: { x: number, y: number, z: number }
    secondHand: { x: number, y: number, z: number }
    holderRotator: { x: number, y: number, z: number }
    wireTop: { x: number, y: number, z: number }
  } | null>(null)

  const active = useRef(false)

  useEffect(() => {
    // 1. SETUP BONES & INITIAL ROTATIONS
    bones.current.base = clone.getObjectByName('Base') || clone.getObjectByName('Base Bone')
    bones.current.firstHand = clone.getObjectByName('FirstHand') || clone.getObjectByName('FirstHand Bone')
    bones.current.secondHand = clone.getObjectByName('SecondHand') || clone.getObjectByName('SecondHand Bone')
    bones.current.holderRotator = clone.getObjectByName('Holder-Rotator') || clone.getObjectByName('Holder-Rotator Bone')
    bones.current.wireTop = clone.getObjectByName('Wire_Blue_Top')

    if (bones.current.base && !initialRotations.current) {
      initialRotations.current = {
        base: { x: bones.current.base.rotation.x, y: bones.current.base.rotation.y, z: bones.current.base.rotation.z },
        firstHand: { x: bones.current.firstHand!.rotation.x, y: bones.current.firstHand!.rotation.y, z: bones.current.firstHand!.rotation.z },
        secondHand: { x: bones.current.secondHand!.rotation.x, y: bones.current.secondHand!.rotation.y, z: bones.current.secondHand!.rotation.z },
        holderRotator: { x: bones.current.holderRotator!.rotation.x, y: bones.current.holderRotator!.rotation.y, z: bones.current.holderRotator!.rotation.z },
        wireTop: bones.current.wireTop ? { x: bones.current.wireTop.rotation.x, y: bones.current.wireTop.rotation.y, z: bones.current.wireTop.rotation.z } : { x: 0, y: 0, z: 0 }
      }
    }

    // 2. SETUP MOUSE AUTO-RESET via Canvas Events
    const canvas = gl.domElement
    const handleEnter = () => { active.current = true }
    const handleLeave = () => { active.current = false } // Reset to center on leave
    // We don't strictly need mousemove if we trust enter/leave, but it's safe to keep
    const handleMove = () => { active.current = true }

    canvas.addEventListener('pointerenter', handleEnter)
    canvas.addEventListener('pointerleave', handleLeave)
    canvas.addEventListener('pointermove', handleMove)

    return () => {
      canvas.removeEventListener('pointerenter', handleEnter)
      canvas.removeEventListener('pointerleave', handleLeave)
      canvas.removeEventListener('pointermove', handleMove)
    }
  }, [clone, gl])



  useFrame((state, delta) => {
    if (!initialRotations.current) return

    // HIDE TOP BLUE WIRE (User Request)
    if (bones.current.wireTop) {
      bones.current.wireTop.scale.set(0, 0, 0)
    }

    const safeDelta = Math.min(delta, 0.1)
    const t = 2.5 * safeDelta
    const { pointer } = state

    // If active, use pointer. If inactive (left screen), go to 0,0 (Rest Pose)
    const px = active.current ? pointer.x : 0
    const py = active.current ? pointer.y : 0

    // Base: Horizontal
    if (bones.current.base) {
      const offset = px * Math.PI * 1
      const targetY = initialRotations.current.base.y + offset

      const clampedY = MathUtils.clamp(targetY, initialRotations.current.base.y - Math.PI / 1.5, initialRotations.current.base.y + Math.PI / 1.5)

      bones.current.base.rotation.y = MathUtils.lerp(
        bones.current.base.rotation.y,
        clampedY,
        t
      )
    }

    // First Hand: Vertical (Y Axis)
    if (bones.current.firstHand) {
      // User requested "Restricted Angle" -> Reduced Multiplier & Clamp
      const offset = -py * Math.PI * 0.5 // Reduced from 0.8
      const targetY = initialRotations.current.firstHand.y + offset

      // Tightened clamp (0.6 rad is approx 35 degrees)
      const clampedY = MathUtils.clamp(targetY, initialRotations.current.firstHand.y - 0.6, initialRotations.current.firstHand.y + 0.6)

      bones.current.firstHand.rotation.y = MathUtils.lerp(
        bones.current.firstHand.rotation.y,
        clampedY,
        t
      )
    }

    // Second Hand: Relative
    if (bones.current.secondHand) {
      const offset = -py * Math.PI * 0.6
      const targetX = initialRotations.current.secondHand.x + offset

      const clampedX = MathUtils.clamp(targetX, initialRotations.current.secondHand.x - 1.0, initialRotations.current.secondHand.x + 1.0)

      bones.current.secondHand.rotation.x = MathUtils.lerp(
        bones.current.secondHand.rotation.x,
        clampedX,
        t
      )
    }

    // Holder Rotator
    if (bones.current.holderRotator) {
      const offset = px * Math.PI * 0.4
      const targetY = initialRotations.current.holderRotator.y + offset

      bones.current.holderRotator.rotation.y = MathUtils.lerp(
        bones.current.holderRotator.rotation.y,
        targetY,
        t
      )
    }
  })

  return (
    <group scale={0.5} >
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/models/robot-arm-animated.glb')
