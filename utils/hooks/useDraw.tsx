import { useCallback, useEffect } from "react";

const useDraw = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  newDataRef: React.MutableRefObject<any[]>,
  inputRef: React.RefObject<HTMLInputElement>,
  value: string
) => {
  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    // Get computed styles of the input element
    const computedStyles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));

    // Set font and draw text
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    // Only retrieve image data if necessary (using getImageData)
    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    // Optimize the loop for better performance
    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const index = (y * 800 + x) * 4;

        // Check if pixel is not fully transparent (alpha channel)
        if (pixelData[index + 3] !== 0) {
          newData.push({
            x,
            y,
            color: `rgba(${pixelData[index]}, ${pixelData[index + 1]}, ${
              pixelData[index + 2]
            }, ${pixelData[index + 3] / 255})`,
          });
        }
      }
    }

    // Update the ref with new pixel data
    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1, // Optional: radius, can be adjusted
      color,
    }));
  }, [value, canvasRef, inputRef, newDataRef]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  return {
    draw,
  };
};

export default useDraw;
