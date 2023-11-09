import type { Session, User } from 'lucia';

export const createCallbackResponse = (user: User, session: Session, locals: App.Locals) => {
	locals.auth.setSession(session);
	const redirectUrl = '/';
	return new Response(null, {
		status: 302,
		headers: {
			Location: redirectUrl
		}
	});
};
