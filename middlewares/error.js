export const ErrorMiddleware = () => {
  return (req, res) => {
    res.status(404).send('Endpoint not found XD')
  }
}
