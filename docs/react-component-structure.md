# Component structure

## Common

```jsx
<Button color value handler />
<ButtonContainer icon description color btnText/>
<Header />
<InfoContainer title>
<Jumbotron />
<Select />
```

---

## Sign-in

```jsx
<GraphService>
<MSUtils />
<SignIn/>
<Succes />
// <SignInContainer/>
//<MicrosoftButton/>
```

---

## Students

```jsx
<AfterPreTest />
<AfterPreTestEnd />
<Default />
<Evaluations />
<EvaluationsEnd />
<Instructions />
<InstructionsEnd />

// <LearnGoal title description/>
// <LearnGoalImage imageLink/>
// <Question type title description />
// <StudentEndScreen />
```

---

## Teacher

```jsx
<Columns />
<Completed />
<General />
<Goals />
<Logbooks />
<Overview />
<Studentlogbook />
<TeacherLanding />

```
<!-- 
## LogbookDesigner

```jsx
<Select title options />
<AddLearnGoal />
<LearnGoalList />
<LearnGoal />
<LogbookOverview />
<LogBookTable />
<LogBookTableItem />
<LogBookTableFilter />

``` -->

---

## Containers

```jsx
<Teacher />
<Student />
<SignIn />
<NoAccess />
```
