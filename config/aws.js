module.exports.es = {
	accessKeyId: (process.env.AWS_ES_ACCESSKEYID ? process.env.AWS_ES_ACCESSKEYID : ''),
	secretAccessKey: (process.env.AWS_ES_ACCESSKEY ? process.env.AWS_ES_ACCESSKEY : ''),
	service: 'es',
	region: (process.env.AWS_ES_REGION ? process.env.AWS_ES_REGION : ''),
	host: (process.env.AWS_ES_HOST ? process.env.AWS_ES_HOST : '')
}