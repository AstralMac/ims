import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <header class="header">
        <h1>Inventory Management System &#40;IMS&#41;</h1>
      </header>
      <nav class='sidebar'>
        <ul>
          <li class='nav-item'><a class='nav-route' routerLink='/'>Home</a></li>
          <li class= 'nav-item'><a class='nav-route' routerLink='/inventory'>Inventory List</a>
            <ul class='nested-nav'>
              <li class='nav-item'><a class='nav-route' routerLink='/inventory/add'>Add Inventory Item</a></li>
              <li class='nav-item'><a class='nav-route' routerLink='/inventory/by-id'>Inventory by ID</a></li>
              <li class='nav-item'><a class='nav-route' routerLink='/inventory/search'>Search  Inventory</a></li>
              <li class='nav-item'><a class='nav-route' routerLink='/inventory/update'>Update Inventory Item</a></li>
              <li class='nav-item'><a class='nav-route' routerLink='/inventory/delete'>Delete Inventory Item</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <main>
        <section>
          <router-outlet />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MEAN Stack Project</p>
      </footer>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      text-align: center;
      padding: 0;
      margin: 0 auto;
    }

    header, footer {
      background-color: #800080;
      padding:10px 0;
    }
     nav.sidebar {
      width: 250px; /* Sidebar width */
      float: left;
      position: fixed;
      height: 100%; /* Full height */
      background-color: #800080; /* Sidebar background */
      color: white;
      padding-top: 50px;
      text-align: left
    }
    nav ul {
      list-style-type: none;
      padding: 0;
    }

    nav ul li {
      margin: 15px 0;
    }

    nav ul li a {
      color: white;
      text-decoration: none;
      padding: 10px;
      display: block;
    }

    nav ul li a:hover {
      background-color: #575757;
    }

    .nested {
      display: none; /* Hide nested items by default */
      padding-left: 20px;
    }

    nav ul li:hover .nested {
      display: block; /* Show nested items on hover */
    }

    main {
      margin-left: 260px; /* Adjust content to avoid overlap with the sidebar */
      padding-bottom:20px;
      flex-grow: 1;
    }
  `
})
export class AppComponent {
  title = 'ets-client';
}
