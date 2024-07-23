export const generateCode = (value) => {
    let output = ''
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').forEach(item => {
        output += item.charAt(0) + item.charAt(1)
    });
    output+= value.length
    return output
}
