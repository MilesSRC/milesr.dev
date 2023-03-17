import { useEffect, useRef, useState } from "react";

export default function TheStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stars, setStars] = useState<[number, number][]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas === null) return;

        const context = canvas.getContext("2d");

        if (context === null) return;

        // Find total 'n' amount of stars based on the canvas resolution
        let nStars = 1000;

        // Create initial stars
        let initialStars: [number, number][] = [...Array(nStars)].map(() => [
            Math.random() * canvas.width,
            Math.random() * canvas.height,
        ]);

        setStars(initialStars);

        let resized = false;

        // Move and redraw the stars
        const moveStars = (previousStars: [number, number][]) => {
            // Resize the canvas if it has been resized
            if (resized) 
                return;

            // Update resolution
            canvas.width = canvas.clientWidth * 2;
            canvas.height = canvas.clientHeight * 2;

            let newStars = previousStars;

            // Remove stars that are off the canvas
            newStars = newStars.filter(
                (star) => star[0] > 0 && star[0] < canvas.width && star[1] > 0 && star[1] < canvas.height
            );

            // Add new stars to replace the removed ones
            const nNewStars = nStars - newStars.length;

            for (let i = 0; i < nNewStars; i++) {
                newStars.push([Math.random() * canvas.width / 10, Math.random() * canvas.height]);
            }

            // Move the stars
            newStars = newStars.map((star) => [star[0] + 1, star[1]]);

            // Draw the stars
            context.fillStyle = "black";
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = "white";

            for (const star of newStars) {
                context.fillRect(star[0], star[1], 2, 2);
            }

            // Request a new frame
            requestAnimationFrame(() => moveStars(newStars));
        };

        // Start the animation loop
        moveStars(initialStars);

        // Window Resize Listener
        window.addEventListener('resize', () => {
            // Resize
            resized = true;

            // Find total 'n' amount of stars based on the canvas resolution
            nStars = 1000;

            // Create initial stars
            initialStars = [...Array(nStars)].map(() => [
                Math.random() * canvas.width,
                Math.random() * canvas.height,
            ]);

            setStars(initialStars);
            
            setTimeout(() => {
                resized = false;
                moveStars(initialStars);
            }, 200)
        });

        // Clean up
        return () => cancelAnimationFrame(0);
    }, []);

    return (
        <canvas className="TheStars" ref={canvasRef} />
    );   
}