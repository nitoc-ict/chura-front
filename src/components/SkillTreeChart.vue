<template>
  <div>
    <div
        id="graphContainer"
        ref="skillTreeContainer"
        style="padding: 24px; background-color: antiquewhite"
    ></div>
  </div>
</template>

<script>
import {Skill} from "@/domain/skilltree/Skill";
import {Task} from "@/domain/skilltree/Task";

const mxClient = require("mxgraph")({
  mxLoadResources: false,
  mxLoadStylesheets: false
})

export default {
  name: 'SkillTreeChart',
  props: {
    character_id: {
    }
  },
  data: function(){
    return {
    skillTree: [
      new Skill(
          'test_1',
          'クソ長スキル名を入れてみたらどんなレイアウトになるんでしょうね。',
          'スキル１の説明を書きます。',
          [
            new Task(
                'test_1_1',
                'Task1',
                'Taskの説明',
                true
            ),
            new Task(
                'test_1_2',
                'Task2',
                'Taskの説明',
                true
            ),
            new Task(
                'test_1_3',
                'Task3',
                'Taskの説明',
                true
            ),
          ],
          [],
      ),
      new Skill(
          'test_2',
          'スキル2',
          'スキル2の説明を書きます。',
          [
            new Task(
                'test_2_1',
                'Task1',
                'Taskの説明',
                true
            ),
            new Task(
                'test_2_2',
                'Task2',
                'Taskの説明',
                true
            ),
            new Task(
                'test_2_3',
                'Task3',
                'Taskの説明',
                true
            ),
          ],
          ['test_1'],
      ),
      new Skill(
          'test_3',
          'スキル3',
          'スキル3の説明を書きます。',
          [
            new Task(
                'test_1_1',
                'Task1',
                'Taskの説明',
                true
            ),
            new Task(
                'test_1_2',
                'Task2',
                'Taskの説明',
                true
            ),
            new Task(
                'test_1_3',
                'Task3',
                'Taskの説明',
                true
            ),
          ],
          ['test_1'],
      ),
    ],
    container: null,
    graph: null,      //MxGraphのインスタンスを格納する為の変数
    parent: null,     //グラフのエッジやノードを追加する際に必要
    }
  },
  mounted: function () {
    this.init();
    this.drawGraph();
  },
  methods: {
    init: function () {
      this.container = this.$refs.skillTreeContainer;
      this.graph = new mxClient.mxGraph(this.container);
      this.parent = this.graph.getDefaultParent();
    },
    drawGraph: function () {
      const layout = new mxClient.mxHierarchicalLayout(this.graph);
      const vertexs = new Map();

      this.graph.getModel().beginUpdate();

      try {
        for(const skill of this.skillTree) {
          const vertex = this.graph.insertVertex(
              this.parent,
              skill.skillId,  //ノードの識別子
              skill.title,    //ノードをラベル
              null,           //ノードのx座標
              null,           //ノードのy座標
              80,             //ノードの幅
              30,             //ノードの高さ
              null            //ノードのスタイル
          );
          vertexs.set(skill.skillId, vertex);

          for (const dependSkillId of skill.dependentSkillIds) {
            console.log("dependSkillId" + dependSkillId)
            this.graph.insertEdge(
                this.parent,
                null,                       //エッジの識別子
                null,                       //エッジのラベル
                vertexs.get(dependSkillId),   //エッジの始点となるノード
                vertexs.get(skill.skillId), //エッジの終点となるノード
                null                        //エッジのスタイル
            );
          }
        }
        layout.execute(this.parent);
      } finally {
        this.graph.getModel().endUpdate();
      }
    }
  }
}
</script>
