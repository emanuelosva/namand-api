export async function healthyCheck(request, reply) {
  reply.send({ api: 'v1', alive: true })
}
