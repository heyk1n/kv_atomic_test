const kv = await Deno.openKV();

Deno.serve((request) => {
	const lastVisited = (await kv.get("lastVisited")).value ?? null;
	const visits = (await kv.get("visits")).value ?? 0;
	
	const atomic = kv.atomic();
	
	const newLastVisited = new Date();
	atmoic.set("lastVisited", newLastVisited);
	const newVisits = visits + 1;
	atomic.set("visits", newVisits);

	await atomic.commit();
	return new Response(`Last Visit: ${newLastVisited}\nVisits: ${newVisits}`);
});
