<template>
  <div>
    <v-container>
      <v-row>
        <v-col
            cols="8"
            style="padding: 24px; background-color: antiquewhite"
        >
          <div
              id="graphContainer"
              ref="skillTreeContainer"
          ></div>
        </v-col>
        <v-col
            cols="4"
            style="padding: 24px; background-color: darkcyan;"
        >
          <p>{{selectedSkill.skillTitle}}</p>
          <p>{{selectedSkill.skillDescription}}</p>
          <v-row
              v-for="(task, index) in taskList" :key = index
          >
            <p>{{task.taskTitle}}</p>
            <p>{{task.taskDescription}}</p>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {GetDI} from "@/views/controller/GetDI";
import {SkillDTO} from "@/application/dto/SkillDTO";
import {TaskDTO} from "@/application/dto/TaskDTO";

const mxClient = require("mxgraph")({
  mxLoadResources: false,
  mxLoadStylesheets: false
})

export default {
  name: 'SkillTreeChart',
  props: {
    character_id: {
      type: String,
    }
  },
  data: function(){
    return {
      container: null,    // SkillTreeを描画する要素のインスタンスを取得
      graph: null,        // MxGraphのインスタンスを格納する為の変数
      parent: null,       // グラフのエッジやノードを追加する際に必要

      skillTreeApp: null, // SkillApplicationServiceのインスタンスを格納する
      taskApp: null,      // TaskApplicationServiceのインスタンスを格納する

      selectedSkill: {    // 現在選択されているスキル
        type: SkillDTO,
        default: null,
      },
      taskList: {         // 現在選択されているスキルのタスクリスト
        type: TaskDTO,
        default: [],
      }
    }
  },
  watch: {
    character_id: async function(newId) {
      await this.drawGraph(newId);
    },
  },
  mounted: async function () {
    await this.initAppService();
    await this.initGraph();
    this.drawGraph();
  },
  methods: {
    // SkillとTaskのApplicationServiceを取得する。
    initAppService: function (){
      const di = GetDI.getInstance();
      this.skillTreeApp = di.skillTreeApplication;
      this.taskApp = di.taskApplication;
    },

    // mxGraphの初期化処理
    initGraph: function () {
      this.container = this.$refs.skillTreeContainer;
      this.graph = new mxClient.mxGraph(this.container);
      this.parent = this.graph.getDefaultParent();
    },

    // Skillデータを取得してきてグラフ上に描画する
    drawGraph: async function (characterId) {
      const layout = new mxClient.mxHierarchicalLayout(this.graph);
      const vertexs = new Map();
      const skillTree = await this.skillTreeApp.getSkillTreeById(characterId);

      // グラフ内の要素をクリックした際の処理を追加
      this.graph.addListener('click', (sender, evt) => {
        //イベントからCellを取得
        const cell = evt.getProperty('cell');

        //取得したモノが、グラフ上に存在しているセルなのか
        if (this.graph.getModel().isVertex(cell)) {
          const skillId = cell.id;      //cellのidはskillIdと同じに設定しているのでコレでSkillのIdが取れる
          this.showSkillInfo(skillId);  //タップしたSkillの詳細を表示
        }
      })

      // グラフの形状やデザインの変更を行う(グラフモデルを変更する)際は
      // beginUpdate -> グラフモデル変更 -> endUpdate の順に行う
      this.graph.getModel().beginUpdate();

      //グラフ内のノードとエッジを全部削除
      this.graph.removeCells(this.graph.getChildCells(this.parent));

      try {
        for(const skill of skillTree) {
          // SkillをノードとしてGraph上に追加
          const vertex = this.graph.insertVertex(
              this.parent,
              skill.skillId,    // ノードの識別子
              skill.skillTitle, // ノードをラベル
              null,             // ノードのx座標
              null,             // ノードのy座標
              80,               // ノードの幅
              30,               // ノードの高さ
              null              // ノードのスタイル
          );

          // vertexsにskillIdをKeyにしてノードのインスタンスを追加
          vertexs.set(skill.skillId, vertex);

          // ノードとノードをつなげるEdgeを追加
          for (const dependSkillId of skill.dependentSkillIds) {
            console.log("dependSkillId" + dependSkillId)
            this.graph.insertEdge(
                this.parent,
                null,                       // エッジの識別子
                null,                       // エッジのラベル
                vertexs.get(dependSkillId), // エッジの始点となるノード
                vertexs.get(skill.skillId), // エッジの終点となるノード
                null                        // エッジのスタイル
            );
          }
        }
        layout.execute(this.parent);
      } finally {
        this.graph.getModel().endUpdate();
      }
    },

    // taskIdを元に、selectedSkillとtaskListを更新する
    showSkillInfo: async function (skillId){
      this.selectedSkill = await this.skillTreeApp.getSkillById(this.character_id, skillId);
      this.taskList = await this.taskApp.getAllTasksBySkillId(skillId);
      console.log(this.taskList);
    },
  }
}
</script>
