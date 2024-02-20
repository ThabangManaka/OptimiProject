import { Component, OnDestroy, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Group, Project } from '../models/Project';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy{
  searchTerm: string = '';

  projects: Project[] = [];
filteredProjects: Project[] = [];
filteredGroups: Group[] = [];

projectSubscription: Subscription ;
faSearch =faSearch
faPlus= faPlus
selectedIndex = 0;
activeIndex = 0;


  constructor(private apiService : ApiService) {
    this.projectSubscription = this.apiService.getData().subscribe(data => {
      this.projects = data;
      this.filteredProjects = data;
     })

  }


  filterGroups(): void {
    if (!this.searchTerm) {
      this.filteredProjects = this.projects;
      return;
    }

    this.filteredProjects = [];
    for (const project of this.projects) {
      const matchingGroups = project.groups.filter(group =>
        group.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      const matchingProjectName = project.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      if (matchingGroups.length > 0  || matchingProjectName) {
        // Add project with filtered groups
        this.filteredProjects.push({ ...project,
          groups: matchingGroups,
          name: matchingProjectName ? project.name : project.name });
      } else {
        // Add project without filtered groups
        this.filteredProjects.push({ ...project, groups: [] });
      }
    }
}
//@HostListener('window:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  if (event.key === 'ArrowUp') {
    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    event.preventDefault(); // Prevent page scrolling
  } else if (event.key === 'ArrowDown') {
    this.selectedIndex = Math.min(this.filteredProjects.length - 1, this.selectedIndex + 1);
    event.preventDefault(); // Prevent page scrolling
  }
}

ngOnDestroy(): void {
  if (this.projectSubscription){
    this.projectSubscription.unsubscribe();
  }
}


}
