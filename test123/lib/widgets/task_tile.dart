import 'package:flutter/material.dart';

class TaskTile extends StatefulWidget {
  @override
  State<TaskTile> createState() => _TaskTileState();
}

class _TaskTileState extends State<TaskTile> {
  bool isChecked = false;
  void checkboxCallback(bool? checkboxValue){
      setState(() {
        isChecked = checkboxValue == null ? false: checkboxValue;
      });
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('This is a task'),
      trailing: TaskCheckBox(isChecked, checkboxCallback),
    );
  }
}

class TaskCheckBox extends StatelessWidget {
  final bool isChecked;
  final void Function(bool?) toggleCallback;

  TaskCheckBox(this.isChecked, this.toggleCallback);

  @override
  Widget build(BuildContext context) {
    return Checkbox(
      activeColor: Colors.lightBlueAccent,
      value: isChecked,
      onChanged: toggleCallback,
    );
  }
}