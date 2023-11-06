import 'package:flutter/material.dart';
import 'package:test123/screens/tasks_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test123',
      home: TasksScreen(),
    );
  }
}


