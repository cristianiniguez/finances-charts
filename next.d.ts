type NextRouteHandler<Params = unknown> = (req: Request, ctx: { params: Params }) => Response | Promise<Response>
