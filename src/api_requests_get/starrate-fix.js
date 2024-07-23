module.exports = async (req, res) => {
	await res.send(JSON.stringify({response: 'Hello, World!'}));
}