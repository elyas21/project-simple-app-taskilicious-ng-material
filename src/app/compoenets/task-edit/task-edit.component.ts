import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Team } from 'src/app/models/Team';
import { CategorieService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamMembersService } from 'src/app/services/team-members.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  taskId: string | undefined | null;
  catagoriesList: Category[] | undefined;
  catagoriesListSubscription: Subscription | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl(''),
    id: new FormControl(''),
    teamMemberIds: new FormArray([])
  })
  teamList: Team[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: CategorieService,
    private _task: TaskService,
    private _team: TeamMembersService
  ) {
  }
  ngOnInit(): void {
    this.catagoriesListSubscription = this._service.getAllCategories().subscribe(res => {
      this.catagoriesList = res;
    }
  
    )
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.taskId = params.get('id')
        return this._task.getTaskByID(params.get('id'))
      })
    ).subscribe(res => {
      if (!!this.taskId)
        this.taskFormGroup.patchValue({ name: res?.name, categoryId: res.categoryId, id: this.taskId })
    });
    this._team.getTeams().subscribe((res: Team[]) => {
      this.teamList = res
      console.log(res);

    })
  }
  updateMemeber(){
    console.log('ol');
    
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
  onSubmit() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value
    let name = this.taskFormGroup.controls['name'].value
    let teamMemberIds = this.taskFormGroup.controls['teamMemberIds'].value
    if (categoryId && name && this.taskId) {
      this._task.updateTask({ categoryId, name, id: this.taskId,teamMemberIds })
        .subscribe(res => this.router.navigate(['/', 'categories', categoryId]))
    }
  }

}
