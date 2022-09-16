const ronin     = require( 'ronin-server' )
const mocks     = require( 'ronin-mocks' )
const database  = require( 'ronin-database' )
// const auth      = require( 'ronin-auth' )
// const rbac      = require( 'ronin-rbac' )


async function main() {

	try {
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

process.on( 'SIGINT', () => shutdown( 'SIGINT' ) )
process.on( 'SIGTERM', () => shutdown( 'SIGTERM' ) )

main()