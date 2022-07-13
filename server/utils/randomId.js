const generateId = () => {
    return (Math.random() * new Date()).toString()
}

module.exports = generateId
