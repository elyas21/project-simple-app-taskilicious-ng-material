import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Team } from 'src/app/models/Team';
import { CategorieService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamMembersService } from 'src/app/services/team-members.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  catagoriesList: Category[] | undefined;
  teamList: Team[] = [];
  catagoriesListSubscription: Subscription | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl(''),
    teamMemberIds: new FormArray([])
  })
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: CategorieService,
    private _task: TaskService,
    private _team: TeamMembersService
  ) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('categoryId');
    this.catagoriesListSubscription = this._service.getAllCategories().subscribe(res => {
      this.catagoriesList = res;
      console.log(res);

    }
    )
    if (id) {
      this.taskFormGroup.controls['categoryId'].setValue(id)
    }
    this._team.getTeams().subscribe((res: Team[]) => {
      this.teamList = res
      console.log(res);

    })
  }
  onSubmit() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value
    let name = this.taskFormGroup.controls['name'].value
    let teamMemberIds = this.taskFormGroup.controls['teamMemberIds'].value
    if (categoryId && name) {
      console.log(this.taskFormGroup.value);

      this._task.createTask({ categoryId, name , teamMemberIds})
        .subscribe(res => this.router.navigate(['/', 'categories', categoryId]))
    }
  }


  get teamMembers(): FormArray {
    return this.taskFormGroup.get('teamMemberIds') as FormArray;
  }


  addTeamMemeber(id: string) {
    let teamValue: string[] = this.teamMembers.value
    if (teamValue && teamValue.includes(id)) {
      this.taskFormGroup.controls['teamMemberIds'].removeAt(teamValue.indexOf(id))
    } 
    else { this.teamMembers.push(new FormControl(id)) }

  }
  ngOnDestroy() {
    if (!!this.catagoriesListSubscription)
      this.catagoriesListSubscription.unsubscribe()
  }
}
