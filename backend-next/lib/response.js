export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function ok(data, init = {}) {
  return Response.json(
    { success: true, ...data },
    { status: 200, ...init, headers: { ...corsHeaders, ...init.headers } }
  );
}

export function badRequest(message, init = {}) {
  return Response.json(
    { success: false, message },
    { status: 400, ...init, headers: { ...corsHeaders, ...init.headers } }
  );
}

export function unauthorized(message = 'Unauthorized') {
  return Response.json({ success: false, message }, { status: 401, headers: corsHeaders });
}

export function notFound(message = 'Not found') {
  return Response.json({ success: false, message }, { status: 404, headers: corsHeaders });
}

export function options() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
