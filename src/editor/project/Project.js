(function () {
  "use strict";

  var Project = function(editor) {
    this.Container_constructor();

    // Variables
    this._id = b3.createUUID();
    this._editor = editor;
    this._selectedTree = null;
    this._clipboard = [];
    this._nodes = {};

    // Managers
    this.trees = null;
    this.nodes = null;
    this.history = null;

    this._initialize();
  };
  var p = createjs.extend(Project, createjs.Container);

  p._initialize = function() {
    this.trees = new b3e.project.TreeManager(this._editor, this);
    this.nodes = new b3e.project.NodeManager(this._editor, this);
    this.history = new b3e.project.HistoryManager(this._editor, this);

    this.nodes.add(b3e.Root, true);
	for(var name in b3)
	{
		var cls = b3[name];
		if(typeof cls === "function")
		{
			var proto = cls.prototype;
			if(typeof proto.category === "string" && cls !== b3.Action && cls !== b3.Condition && cls !== b3.Composite && cls !== b3.Decorator)
				this.nodes.add(cls, true);
		}
	}
    /*this.nodes.add(b3.Sequence, true);
    this.nodes.add(b3.Priority, true);
    this.nodes.add(b3.MemSequence, true);
    this.nodes.add(b3.MemPriority, true);
    this.nodes.add(b3.Repeater, true);
    this.nodes.add(b3.RepeatUntilFailure, true);
    this.nodes.add(b3.RepeatUntilSuccess, true);
    this.nodes.add(b3.MaxTime, true);
    this.nodes.add(b3.Inverter, true);
    this.nodes.add(b3.Limiter, true);
    this.nodes.add(b3.Failer, true);
    this.nodes.add(b3.Succeeder, true);
    this.nodes.add(b3.Runner, true);
    this.nodes.add(b3.Error, true);
    this.nodes.add(b3.Wait, true);*/

    this._applySettings(this._editor._settings);
    this.history.clear();
    this._editor.clearDirty();
  };

  p._applySettings = function(settings) {
    this.trees._applySettings(settings);
    this.nodes._applySettings(settings);
    this.history._applySettings(settings);
  };

  b3e.project.Project = createjs.promote(Project, 'Container');
})();