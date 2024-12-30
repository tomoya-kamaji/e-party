// import { NextResponse } from 'next/server';
// // The client you created from the Server-Side Auth instructions
// import { supabase } from '@/util/supabase/client';

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get('code');
//   // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get('next') ?? '/';

//   console.log('code', code);
//   console.log('next', next);

//   if (code) {
//     console.log('codeがある');
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.getSession();
//     if (!error) {
//       const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === 'development';
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }