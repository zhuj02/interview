import 'package:flutter/material.dart';
import 'package:test123/screens/add_task_screen.dart';
import '../widgets/tasks_list.dart';

class TasksScreen extends StatelessWidget {
  Widget buildButtomSheet(BuildContext  context){
    return AddTaskScreen();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.lightBlueAccent,
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.lightBlueAccent,
          onPressed: () {
            showModalBottomSheet(context: context, builder: buildButtomSheet);
          },
          child: Icon(Icons.add),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.only(left: 30, top: 70, right: 30, bottom: 30),
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(
                        child: Icon(
                          Icons.list,
                          size: 50,
                          color: Colors.lightBlueAccent,
                        ),
                        backgroundColor: Colors.white,
                        radius: 30,
                      ),
                      SizedBox(
                        height: 10.0,
                      ),
                      Text(
                        'Todoey',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 50,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        '12 tasks',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                        ),
                      ),

                    ],
                  ),
                ],
              ),
            ),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular( 20),
                        topRight: Radius.circular(20)
                    )
                ),
                child: TaskList()
              ),
            ),
          ],
        ));
  }
}

