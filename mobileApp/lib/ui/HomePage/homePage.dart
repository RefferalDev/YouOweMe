import 'package:YouOweMe/ui/HomePage/blurredBottom.dart';
import 'package:flutter/material.dart';

import 'package:YouOweMe/ui/HomePage/oweMe.dart';
import 'package:YouOweMe/ui/NewOwe/newOwe.dart';
import 'package:YouOweMe/ui/HomePage/iOwe.dart';
import 'package:YouOweMe/ui/HomePage/bottomList.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    void goToNewOwe() {
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (BuildContext context) => NewOwe()));
    }

    return Scaffold(
        floatingActionButton: FloatingActionButton.extended(
          label: Text('New'),
          icon: Icon(Icons.add),
          onPressed: goToNewOwe,
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        body: SafeArea(
          child: Padding(
            padding: EdgeInsets.all(15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                OweMe(),
                SizedBox(
                  height: 30,
                ),
                IOwe(),
                SizedBox(
                  height: 30,
                ),
                BottomList(),
                SizedBox(
                  height: 10,
                ),
                BlurredBottom()
              ],
            ),
          ),
        ));
  }
}