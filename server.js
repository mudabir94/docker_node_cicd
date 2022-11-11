const ronin     = require( 'ronin-server' )
const mocks     = require( 'ronin-mocks' )
const database  = require( 'ronin-database' )
// const auth      = require( 'ronin-auth' )
// const rbac      = require( 'ronin-rbac' )


async function main() {

	try {
	console.log("connecting to Mongodb database...")
    await database.connect( process.env.CONNECTIONSTRING )

    const server = ronin.server({
			port: process.env.SERVER_PORT
		})

		server.use( '/', mocks.server( server.Router()) )
		server.use( '/foo', (req, res) => {
            return res.json({ "foo": "bar" })
          })

    const result = await server.start()
		console.info( result )

	} catch( error ) {
		console.error( error )
	}

}

function shutdown( signal ) {
	console.info( `[${signal}] shutting down...` )
	process.exit()
}
//The SIGINT signal interrupted the process
// SIGTERM - signal terminated the process.
// The process on functions will be call when the process or server is interupted or terminated. 
process.on( 'SIGINT', () => shutdown( 'SIGINT' ) )
process.on( 'SIGTERM', () => shutdown( 'SIGTERM' ) )

main()