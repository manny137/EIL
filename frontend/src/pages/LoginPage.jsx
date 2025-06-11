function LoginDialog() {
  return (
      <div className="card-body">
        <div>
          <label className="input validator">
            <input type="email" placeholder="name@eil.co.in" required />
          </label>
        </div>
        <div>
          <button className="btn btn-primary">Continue</button>
        </div>
      </div>
  )
}

export default LoginDialog
