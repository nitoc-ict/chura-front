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
            <p>Task</p>
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

      skillTreeApp: null, // SkillTreeApplicationServiceのインスタンスを格納する

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
    // propsで渡されているcharacter_idに変更があった場合は、グラフを再描画する
    character_id: async function(newId) {
      await this.drawGraph(newId);
    },
  },
  // このスクリプトのインスタンスがページと紐づけられた際に色々初期化してグラフを描画する
  mounted: async function () {
    await this.initAppService();
    await this.initGraph();
    await this.drawGraph(this.character_id);
  },
  methods: {
    // SkillとTaskのApplicationServiceを取得する。
    initAppService: function (){
      const di = GetDI.getInstance();
      this.skillTreeApp = di.skillTreeApplication;
    },

    // mxGraphの初期化処理
    // $refsを使用しているので、mounted以降に呼び出す必要があります。
    initGraph: function () {
      this.container = this.$refs.skillTreeContainer;
      this.graph = new mxClient.mxGraph(this.container);
      this.parent = this.graph.getDefaultParent();
    },

    // Skillデータを取得してきてグラフ上に描画する。
    // initGraphを呼び出した後に呼び出す必要があります。
    drawGraph: async function (characterId) {
      const layout = new mxClient.mxHierarchicalLayout(this.graph);
      const vertices = new Map();
      const skillTree = await this.skillTreeApp.getAllSkillsByCharacterId(characterId);

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
        // SkillDTOをノードとしてGraph上に追加
        for(const skill of skillTree) {
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

          // vertexesにskillIdをKeyにしてノードのインスタンスを追加
          vertices.set(skill.skillId, vertex);
        }

        // Graph上に追加したSkillDTOのノード同士を、SkillDTOの依存関係を元にEdgeで繋げる処理
        for(const skill of skillTree) {
          // ノードとノードをつなげるEdgeを追加
          for (const dependSkillId of skill.dependentSkillIds) {
            this.graph.insertEdge(
                this.parent,
                null,                         // エッジの識別子
                null,                         // エッジのラベル
                vertices.get(dependSkillId),  // エッジの始点となるノード
                vertices.get(skill.skillId),  // エッジの終点となるノード
                null                          // エッジのスタイル
            );
          }
        }
        layout.execute(this.parent);  // 追加されたノードとエッジを元にレイアウトを計算してそれぞれの位置をよしなにしてくれる
      } finally {
        this.graph.getModel().endUpdate();  // グラフの変更が終わったことを通知
      }
    },

    // taskIdを元に、selectedSkillとtaskListを更新する
    showSkillInfo: async function (skillId){
      this.selectedSkill = await this.skillTreeApp.getSkillById(skillId);
      this.taskList = await this.skillTreeApp.getTasksBySkillId(skillId);
      console.log(this.taskList);
    },
  }
}
</script>
