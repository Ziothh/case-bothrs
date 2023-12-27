export * as component from './component';
export * as react from './react';
export * as types from './types';
export * from './general';


export const loadImages = (images: string[]) => Promise.all(
  images.map(x => {
    return new Promise<HTMLImageElement>((res) => {
      const img = new Image();
      img.src = parseImageUrl(x);

      img.onload = () => res(img);
    })
  })
)

export const parseImageUrl = (imageUrl: string) => imageUrl.startsWith('/') 
  ? `${process.env.EXPO_PUBLIC_API_URL}${imageUrl}`
  : imageUrl

export const calculateRelativeMonthDate = (date: Date) => {
  const now = new Date(Date.now());
  

  const deltaDay = now.getDate() - date.getDate();
  if (deltaDay !== 0) return deltaDay === 1 ? `1 day ago` : `${deltaDay} days ago`;

  const deltaHour = now.getHours() - date.getHours();
  if (deltaHour !== 0) return deltaHour === 1 ? `1 hour ago` : `${deltaHour} hours ago`;

  const deltaMinutes = now.getMinutes() - date.getMinutes()
  if (deltaMinutes !== 0) return deltaMinutes === 1 ? `1 minute ago` : `${deltaMinutes} minutes ago`;

  return 'now'
}
