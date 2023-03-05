export function makeImagePath(id:string, format?:string){
  if (id === null) {
    return `https://commons.wikimedia.org/wiki/File:Black.png`;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
};