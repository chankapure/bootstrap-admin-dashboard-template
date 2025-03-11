
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getCroppedImg(
  imageSrc: string, 
  pixelCrop: CropArea, 
  rotation = 0,
  isCircular = false
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => image.onload = resolve);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  const rotRad = rotation * Math.PI / 180;

  // Set proper canvas dimensions before transform & export
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // If we want a circular crop
  if (isCircular) {
    ctx.save();
    // Create a circle
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2,
      0,
      2 * Math.PI
    );
    ctx.clip();
  }

  // Translate and rotate canvas context
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Draw the image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // If circular, restore the context to remove the clip
  if (isCircular) {
    ctx.restore();
  }

  return new Promise((resolve) => {
    canvas.toBlob(file => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        resolve('');
      }
    }, 'image/jpeg');
  });
}
