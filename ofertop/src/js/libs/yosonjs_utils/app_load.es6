var acti, ctrl, modu;

modu = yOSON.module;

ctrl = yOSON.controller;

acti = yOSON.action;

yOSON.AppSchema.modules.all_modules();

if (modu === "" || !yOSON.AppSchema.modules.hasOwnProperty(modu)) {
  yOSON.AppSchema.modules.by_default();
} else {
  yOSON.AppSchema.modules[modu].all_controllers();
  if (ctrl === "" || !yOSON.AppSchema.modules[modu].controllers.hasOwnProperty(ctrl)) {
    yOSON.AppSchema.modules[modu].controllers.by_default();
  } else {
    yOSON.AppSchema.modules[modu].controllers[ctrl].all_actions();
    if (acti === "" || !yOSON.AppSchema.modules[modu].controllers[ctrl].actions.hasOwnProperty(acti)) {
      yOSON.AppSchema.modules[modu].controllers[ctrl].actions.by_default();
    } else {
      yOSON.AppSchema.modules[modu].controllers[ctrl].actions[acti]();
    }
  }
}

