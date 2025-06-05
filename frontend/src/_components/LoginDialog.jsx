function LoginDialog() {
  return (
    <div className="card bg-white w-90 h-144">
      <div className="flex justify-start p-4 m-4">
        <img
          src="https://gssklc1ewg.ufs.sh/f/bePVxoLIPGueO2kSsE9GJUQBHSKpCXf7aMxNoF8nhrbYZOl3"
          alt="logo" />
        <h3 className="justify-end text-[#000000]">Eil</h3>
      </div>
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
    </div>
  )
}

export default LoginDialog
