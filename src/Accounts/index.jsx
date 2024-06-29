
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import Header from "../header";
import Sidebar from '../sidebar';


const Expenses = () => {
	useEffect(() => {
		$('#datatables').DataTable({
			"bFilter": false,
			"paging": true,	
						
		});
				
	},[]);
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
						<div className="row align-items-center">
							<div className="col">
								<h3 className="page-title">Expenses</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
									<li className="breadcrumb-item active">Expenses</li>
								</ul>
							</div>
							<div className="col-auto text-end float-end me-auto">
								<a href="#" className="btn btn-outline-primary ms-2"><i className="fas fa-download"></i> Download</a>
								<Link to="/add-expenses" className="btn btn-primary"><i className="fas fa-plus"></i></Link>
							</div>
						</div>
					</div>
					{/* <!-- /Page Header --> */}
				
					<div className="row">
						<div className="col-sm-12">
						
							<div className="card card-table">
								<div className="card-body">
									<div className="table-responsive">
										<table className="table table-hover table-center mb-0 datatable" id="datatables">
											<thead>
												<tr>
													<th>ID</th>
													<th>Item Name</th>
													<th>Item Quality</th>
													<th>Amount</th>
													<th>Purchase Source</th>
													<th>Purchase Date</th>
													<th>Purchase By</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>PRE2209</td>
													<td>
														<h2>
															<a>Chair</a>
														</h2>
													</td>
													<td>6</td>
													<td>$120</td>
													<td>Abc Shop</td>													
													<td>17 Aug 2020</td>
													<td>Lois</td>
												</tr>
												<tr>
													<td>PRE2213</td>
													<td>
														<h2>
															<a>Table</a>
														</h2>
													</td>
													<td>2</td>
													<td>$56</td>
													<td>Online</td>													
													<td>05 Aug 2020</td>
													<td>Malynne</td>
												</tr>
												<tr>
													<td>PRE2143</td>
													<td>
														<h2>
															<a>Desk</a>
														</h2>
													</td>
													<td>6</td>
													<td>$378</td>
													<td>Take Away</td>
													
													<td>04 Sept 2020</td>
													<td>Levell Scott</td>
												</tr>
												<tr>
													<td>PRE2431</td>
													<td>
														<h2>
															<a>Projector</a>
														</h2>
													</td>
													<td>1</td>
													<td>$246</td>
													<td>Real Shop</td>													
													<td>17 Sept 2020</td>
													<td>Minnie</td>
												</tr>
												<tr>
													<td>PRE1534</td>
													<td>
														<h2>
															<a>Hard disk</a>
														</h2>
													</td>
													<td>2</td>
													<td>$560</td>
													<td>Sony Center</td>													
													<td>02 Oct 2020</td>
													<td>Lois A</td>
												</tr>
												<tr>
													<td>PRE2153</td>
													<td>
														<h2>
															<a>Note books</a>
														</h2>
													</td>
													<td>100</td>
													<td>$236</td>
													<td>DJ Stationary</td>													
													<td>28 Oct 2020</td>
													<td>Calvin</td>
												</tr>
												<tr>
													<td>PRE1252</td>
													<td>
														<h2>
															<a>Water Bottle</a>
														</h2>
													</td>
													<td>267</td>
													<td>$237</td>
													<td>DJ Stationary</td>													
													<td>17 Oct 2020</td>
													<td>Joe Kelley</td>
												</tr>
												<tr>
													<td>PRE1536</td>
													<td>
														<h2>
															<a>Hard disk</a>
														</h2>
													</td>
													<td>3</td>
													<td>$560</td>
													<td>music Center</td>													
													<td>02 Oct 2020</td>
													<td>Lois A</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>							
						</div>					
					</div>					
				</div>

				{/* <!-- Footer --> */}
				<footer>
					<p>Copyright © 2020 Dreamguys.</p>					
				</footer>
				{/* <!-- /Footer -->*/}

			</div>
			{/* <!-- /Page Wrapper --> */}

		</div>
		{/* <!-- /Main Wrapper --> */}
		
	</>
    );
}

export default Expenses;
