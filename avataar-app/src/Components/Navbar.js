import './Navbar.css'

const Navbar = () => {
  return ( 
		<div className="navbar">
			<h1 className="title"> Menu </h1>
			<div className="links">
				<a className="item" href="https://www.google.com"> Item1 </a>
        <a className="item" href="https://www.google.com"> Item2 </a>
        <a className="item" href="https://www.google.com"> Item3 </a>
        <a className="item" href="https://www.google.com"> Item4 </a>
			</div>
		</div>
  );
}

export default Navbar;
