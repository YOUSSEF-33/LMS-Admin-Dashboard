
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from "../header";
import Sidebar from '../sidebar';
import Select2 from 'react-select2-wrapper';


const Editteacher = (props) => {
	const [options, setOptions] = useState([
        { id: 1, text: 'Male' },
        { id: 2, text: 'Female' },    
        { id: 3, text: 'Others' }
      
	]);
    return (
		// <!-- Main Wrapper -->
		<div className="main-wrapper">
			<Header />
			<Sidebar />

			{/* <!-- Page Wrapper --> */}
			<div className="page-wrapper">
                <div className="content container-fluid">

					{/* <!-- Page Header --> */}
					<div className="page-header">
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Edit Teachers</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/teachers">Teachers</Link></li>
									<li className="breadcrumb-item active">Edit Teachers</li>
								</ul>
							</div>
						</div>
					</div>	
					{/* <!-- /Page Header --> */}

					<div className="row">
						<div className="col-sm-12">
						
							<div className="card">
								<div className="card-body">
									<form>
										<div className="row">
											<div className="col-12">
												<h5 className="form-title"><span>Basic Details</span></h5>
											</div>
											<div className="col-12 col-sm-6">  
												<div className="form-group">
													<label>Teacher ID</label>
													<input type="text" className="form-control" defaultValue="PRE1234"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Name</label>
													<input type="text" className="form-control" defaultValue="Vincent"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Gender</label>
													<Select2
                                                            className="w-100"
                                                            data={options}
                                                            options={{
                                                            placeholder: 'Male',
                                                            }}
                                                     />	
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Date of Birth</label>
													<input type="text" className="form-control" defaultValue="23 Jun 1985"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Mobile</label>
													<input type="text" className="form-control" defaultValue="077 3499 9959"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Joining Date</label>
													<input type="text" className="form-control" defaultValue="16 Jul 2015"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Qualification</label>
													<input className="form-control" type="text" defaultValue="Bachelor of Engineering"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Experience</label>
													<input className="form-control" type="text" defaultValue="5"/>
												</div>
											</div>
											<div className="col-12">
												<h5 className="form-title"><span>Login Details</span></h5>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Username</label>
													<input type="text" className="form-control" defaultValue="Vincent"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Email ID</label>
													<input type="email" className="form-control" defaultValue="vincent20@gmail.com"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Password</label>
													<input type="password" className="form-control" defaultValue="vincent"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Repeat Password</label>
													<input type="password" className="form-control" defaultValue="vincent"/>
												</div>
											</div>
											<div className="col-12">
												<h5 className="form-title"><span>Address</span></h5>
											</div>
											<div className="col-12">
												<div className="form-group">
												<label>Address</label>
													<input type="text" className="form-control" defaultValue="3979 Ashwood Drive"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>City</label>
													<input type="text" className="form-control" defaultValue="Omaha"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>State</label>
													<input type="text" className="form-control" defaultValue="Omaha"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Zip Code</label>
													<input type="text" className="form-control" defaultValue="3979"/>
												</div>
											</div>
											<div className="col-12 col-sm-6">
												<div className="form-group">
													<label>Country</label>
													<input type="text" className="form-control" defaultValue="USA"/>
												</div>
											</div>
											<div className="col-12">
												<button type="submit" className="btn btn-primary">Submit</button>
											</div>
										</div>
									</form>
								</div>
							</div>
							
						</div>					
					</div>					
				</div>				
			</div>
			{/* <!-- /Page Wrapper --> */}

		</div>
		// <!-- /Main Wrapper -->
    );
}

export default Editteacher;
