/**
 * SVG is the one upload that has to stay out of both image pipelines: `NEXT_PUBLIC_IMG_URL` is a
 * raster resizer and answers 404 for `.svg`, while the next/image optimizer answers 400 for it
 * unless `dangerouslyAllowSVG` is on — and turning that on would let an admin-uploaded vector
 * carry scripts. A vector therefore reaches the browser exactly as the API handed it over.
 * Extension check, not content type: the src is all we have before the request is made.
 */
export const isSvgUrl = (source: string): boolean => /\.svg(?:[?#]|$)/i.test(source);
