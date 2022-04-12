function geraArrayDeURLs(arrayLinks){
    return arrayLinks.map(objeto => Object.values(objeto).join());
}

export function validaURLs(arrayLinks) {
    return geraArrayDeURLs(arrayLinks);
}