export default function randomKeyGenerator() {
    let precision = 1000000; 
    let randomnum = (Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision)).toString();
    return randomnum;
}