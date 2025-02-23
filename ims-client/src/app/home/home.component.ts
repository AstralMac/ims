import { appConfig } from './../app.config';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <div class ='landing-page'>
    <h2 class='landingPageTitle'>Home</h2>
    <br />
    <h3 class='p-header'>Welcome to Our Inventory Management System</h3>
    <p class='landingPage-p'>Our powerful inventory management system is designed to simplify and streamline your operations. Whether you are managing a small business or a large enterprise, our platform provides the tools you need to keep track of your stock, optimize your supply chain, and improve overall efficiency. With real-time updates, automated processes, and detailed reporting, you can make informed decisions with confidence.</p>

    <br />

    <h3 class='p-header'>Efficient and User-friendly Interface</h3>
    <p class='landingPage-p'>Navigating your inventory has never been easier. Our system features an intuitive, user-friendly interface that requires minimal training. Quickly search for products, view stock levels, and manage orders all in one place. With a responsive design that adapts to both desktop and mobile devices, you can manage your inventory anytime, anywhere.</p>
  </div>
  `,
  styles: `
  .landing-page{
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .landingPageTitle{
    color: #800080;
  }
  .p-header{
    margin-bottom: 5px;
  }
  .landingPage-p{
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  `
})
export class HomeComponent {}
