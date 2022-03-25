
function format(text) {
    let text2 = text.trim(text);
    if(text2 === "" || text2 === " " || text2 === null){
        text2 = 'No Note Text';
    }
    text2 = text2.length > 200 ? text2.substring(0, 200) + "..." : text2
    text2 = text2.replace(/\n\s*\n/g, "-");
    return(text2);
}
export default format;