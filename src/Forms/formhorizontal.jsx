import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from "../header";
import Sidebar from '../sidebar';
import Select2 from 'react-select2-wrapper';


const Formhorizontal = () => {
	const [options, setOptions] = useState([
        { id: 1, text: 'Select' },
        { id: 2, text: 'A+' },
        { id: 3, text: 'O+' },
        { id: 4, text: 'B+' },
		{ id: 5, text: 'AB+' },
	]);
	const [selectOptions, select] = useState([
		{ id: 1, text: 'Select State' },
		{ id: 2, text: 'California' },
		{ id: 3, text: 'Texas' },	
		{ id: 4, text: 'Florida' },			
		]);

	const [countryOptions, setcountryOptions] = useState( [
			
			{ id:1, text: 'USA' },
			{ id:2, text: 'France' },
			{ id:3, text: 'India' },
			{ id:4, text: 'Spain' }
		]);
			
			
		const formHandler = (e) => {
		}
    return (
	<>
		{/* <!-- Main Wrapper --> */}
		<div className="main-wrapper">
			<Header />
			<Sidebar />

			{/* <!-- Page Wrapper --> */}
			<div className="page-wrapper">
                <div className="content container-fluid">
				
					{/* <!-- Page Header --> */}
					<div className="page-header">
						<div className="row">
							<div className="col">
								<h3 className="page-title">Horizontal Form</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
									<li className="breadcrumb-item active">Horizontal Form</li>
								</ul>
							</div>
						</div>
					</div>
					{/* <!-- /Page Header --> */}
					
					<div className="row">
						<div className="col-xl-6 d-flex">
							<div className="card flex-fill">
								<div className="card-header">
									<h5 className="card-title">Basic Form</h5>
								</div>
								<div className="card-body">
									<form>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">First Name</label>
											<div className="col-lg-9">
												<input type="text" className="form-control"/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Last Name</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Email Address</label>
											<div className="col-lg-9">
												<input type="email" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Username</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Password</label>
											<div className="col-lg-9">
												<input type="password" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Repeat Password</label>
											<div className="col-lg-9">
												<input type="password" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="text-end">
											<button type="submit" className="btn btn-primary">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-xl-6 d-flex">
							<div className="card flex-fill">
								<div className="card-header">
									<h5 className="card-title">Address Form</h5>
								</div>
								<div className="card-body">
									<form>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Address 1</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Address 2</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">City</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">State</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Country</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="form-group row">
											<label className="col-lg-3 col-form-label">Postal Code</label>
											<div className="col-lg-9">
												<input type="text" className="form-control" onChange={formHandler}/>
											</div>
										</div>
										<div className="text-end">
											<button type="submit" className="btn btn-primary">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Two Column Horizontal Form</h5>
								</div>
								<div className="card-body">
									<h5 className="card-title">Personal Information</h5>
									<form>
										<div className="row">
											<div className="col-xl-6">
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">First Name</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Last Name</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Gender</label>
													<div className="col-lg-9">
														<div className="form-check form-check-inline">
															<input className="form-check-input" type="radio" name="gender" onChange={formHandler} id="gender_male" value="option1" checked />
															<label className="form-check-label" htmlFor="gender_male">
															Male
															</label>
														</div>
														<div className="form-check form-check-inline">
															<input className="form-check-input" type="radio" name="gender" onChange={formHandler} id="gender_female" value="option2" />
															<label className="form-check-label" htmlFor="gender_female">
															Female
															</label>
														</div>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Blood Group</label>
													<div className="col-lg-9">
													<Select2
                                                             className="w-100"
                                                            data={countryOptions}
                                                            options={{
                                                                placeholder: 'Select ',
                                                            }}
                                                        />
														
													</div>
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Username</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Email</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Password</label>
													<div className="col-lg-9">
														<input type="password" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Repeat Password</label>
													<div className="col-lg-9">
														<input type="password" className="form-control" onChange={formHandler}/>
													</div>
												</div>
											</div>
										</div>
										<h5 className="card-title">Address</h5>
										<div className="row">
											<div className="col-xl-6">
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Address Line 1</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Address Line 2</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">State</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
											</div>
											<div className="col-xl-6">
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">City</label>
													<div className="col-lg-9">
														<input type="text" className="form-control"onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Country</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Postal Code</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
											</div>
										</div>
										<div className="text-end">
											<button type="submit" className="btn btn-primary">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title">Two Column Horizontal Form</h5>
								</div>
								<div className="card-body">
									<form>
										<div className="row">
											<div className="col-xl-6">
												<h5 className="card-title">Personal Details</h5>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">First Name</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Last Name</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Password</label>
													<div className="col-lg-9">
														<input type="password" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">State</label>
													<div className="col-lg-9">
													<Select2
                                                             className="w-100"
                                                            data={selectOptions}
                                                            options={{
                                                                placeholder: 'Select State',
                                                            }}
                                                        />														
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">About</label>
													<div className="col-lg-9">
														<textarea rows="4" cols="5" className="form-control" placeholder="Enter message" onChange={formHandler}></textarea>
													</div>
												</div>
											</div>
											<div className="col-xl-6">
												<h5 className="card-title">Personal details</h5>
												<div className="row">
													<label className="col-lg-3 col-form-label">Name</label>
													<div className="col-lg-9">
														<div className="row">
															<div className="col-md-6">
																<div className="form-group">
																	<input type="text" placeholder="First Name" className="form-control" onChange={formHandler}/>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<input type="text" placeholder="Last Name" className="form-control" onChange={formHandler}/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Email</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Phone</label>
													<div className="col-lg-9">
														<input type="text" className="form-control" onChange={formHandler}/>
													</div>
												</div>
												<div className="form-group row">
													<label className="col-lg-3 col-form-label">Address</label>
													<div className="col-lg-9">
														<input type="text" className="form-control m-b-20" onChange={formHandler}/>
														<div className="row">
															<div className="col-md-6">
																<div className="form-group">
																<Select2
														className="w-100"
														data={countryOptions}
														options={{
															placeholder: 'Select Country',
														}}
														/>														
																</div>
																<div className="form-group">
																	<input type="text" placeholder="ZIP code" className="form-control" onChange={formHandler}/>
																</div>
															</div>
															<div className="col-md-6">
																<div className="form-group">
																	<input type="text" placeholder="State/Province" className="form-control" onChange={formHandler}/>
																</div>
																<div className="form-group">
																	<input type="text" placeholder="City" className="form-control" onChange={formHandler}/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="text-end">
											<button type="submit" className="btn btn-primary">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			
				{/* <!-- Footer --> */}
				<footer>
					<p>Copyright © 2020 Dreamguys.</p>					
				</footer>
				{/* <!-- /Footer --> */}
				
			</div>
			{/* <!-- /Page Wrapper --> */}

		</div>
		{/* <!-- /Main Wrapper --> */}

	</>
    );
}

export default Formhorizontal;
