import { useEffect, useRef } from 'react'

export default function GridDistortion({
    imageSrc,
    grid = 15,
    mouse = 0.1,
    strength = 0.15,
    relaxation = 0.9
}) {
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const gridPointsRef = useRef([])
    const animationFrameRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = imageSrc
        imageRef.current = img

        const resizeCanvas = () => {
            const parent = canvas.parentElement
            canvas.width = parent.offsetWidth
            canvas.height = parent.offsetHeight
            initGrid()
        }

        const initGrid = () => {
            gridPointsRef.current = []
            const cols = grid
            const rows = grid
            const cellWidth = canvas.width / cols
            const cellHeight = canvas.height / rows

            for (let i = 0; i <= rows; i++) {
                for (let j = 0; j <= cols; j++) {
                    gridPointsRef.current.push({
                        x: j * cellWidth,
                        y: i * cellHeight,
                        originalX: j * cellWidth,
                        originalY: i * cellHeight,
                        vx: 0,
                        vy: 0
                    })
                }
            }
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const animate = () => {
            if (!ctx || !imageRef.current.complete) {
                animationFrameRef.current = requestAnimationFrame(animate)
                return
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update grid points based on mouse position
            gridPointsRef.current.forEach(point => {
                const dx = mouseRef.current.x - point.x
                const dy = mouseRef.current.y - point.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = 200

                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * strength * 100
                    point.vx += (dx / distance) * force * mouse
                    point.vy += (dy / distance) * force * mouse
                }

                // Apply relaxation
                point.vx += (point.originalX - point.x) * (1 - relaxation) * 0.1
                point.vy += (point.originalY - point.y) * (1 - relaxation) * 0.1

                // Apply velocity
                point.x += point.vx
                point.y += point.vy

                // Damping
                point.vx *= 0.95
                point.vy *= 0.95
            })

            // Draw distorted image
            const cols = grid
            const rows = grid

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const p1 = gridPointsRef.current[i * (cols + 1) + j]
                    const p2 = gridPointsRef.current[i * (cols + 1) + j + 1]
                    const p3 = gridPointsRef.current[(i + 1) * (cols + 1) + j + 1]
                    const p4 = gridPointsRef.current[(i + 1) * (cols + 1) + j]

                    if (!p1 || !p2 || !p3 || !p4) continue

                    const srcX = (j / cols) * imageRef.current.width
                    const srcY = (i / rows) * imageRef.current.height
                    const srcW = imageRef.current.width / cols
                    const srcH = imageRef.current.height / rows

                    ctx.save()
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.lineTo(p3.x, p3.y)
                    ctx.lineTo(p4.x, p4.y)
                    ctx.closePath()
                    ctx.clip()

                    // Simple quad drawing
                    const avgX = (p1.x + p2.x + p3.x + p4.x) / 4
                    const avgY = (p1.y + p2.y + p3.y + p4.y) / 4
                    const avgW = Math.abs(p2.x - p1.x)
                    const avgH = Math.abs(p4.y - p1.y)

                    ctx.drawImage(
                        imageRef.current,
                        srcX, srcY, srcW, srcH,
                        avgX - avgW / 2, avgY - avgH / 2, avgW, avgH
                    )

                    ctx.restore()
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        img.onload = () => {
            resizeCanvas()
            animate()
        }

        window.addEventListener('resize', resizeCanvas)
        canvas.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            canvas.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [imageSrc, grid, mouse, strength, relaxation])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block'
            }}
        />
    )
}
