import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string | undefined): string {
  const date: Date = new Date(dateString || "");
  const now: Date = new Date();
  const diff: number = now.getTime() - date.getTime();

  const seconds: number = Math.floor(diff / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const months: number = Math.floor(days / 30);
  const years: number = Math.floor(months / 12);

  if (years > 1) {
    return `${years} years ago`;
  } else if (years === 1) {
    return "1 year ago";
  } else if (months > 1) {
    return `${months} months ago`;
  } else if (months === 1) {
    return "1 month ago";
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "1 day ago";
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return "1 minute ago";
  } else {
    return "Just now";
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};