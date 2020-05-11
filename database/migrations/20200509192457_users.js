// for registration
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 50)
                .notNullable()
                .unique();
            tbl.string('password', 250)
                .notNullable();
            tbl.integer('zone_id', 50)
                .unsigned()
                .references('id')
                .inTable('zones')
                .notNullable()
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('role_id', 150)
                .notNullable()
                .references('id')
                .inTable('roles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('communities', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
        })
        .createTable('zones', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
            tbl.integer('community_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('communities')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('families', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
            tbl.integer('zone_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('zones')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('individuals', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
            tbl.string('gender', 100)
                .notNullable()
            tbl.integer('age')
                .notNullable()
            tbl.integer('family_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('families')
        })
        .createTable('roles', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
        })
        .createTable('surveys', tbl => {
            tbl.increments();
            tbl.string('name', 100)
                .notNullable()
            tbl.string('type', 100)
                .notNullable()
        })
        .createTable('survey_questions', tbl => {
            tbl.increments();
            tbl.boolean('active', 100)
                .notNullable()
                .defaultTo(true)
            tbl.integer('survey_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('surveys')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('question_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('questions')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('questions', tbl => {
            tbl.increments();
            tbl.string('question', 100)
                .notNullable()
        })
        .createTable('responses', tbl => {
            tbl.increments();
            tbl.string('response', 100)
                .notNullable()
            tbl.integer('survey_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('surveys')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('question_id', 100)
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('questions')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('individual_id', 100)
                .unsigned()
                .references('id')
                .inTable('individuals')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('family_id', 100)
                .unsigned()
                .references('id')
                .inTable('families')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('responses')
        .dropTableIfExists('questions')
        .dropTableIfExists('survey_questions')
        .dropTableIfExists('surveys')
        .dropTableIfExists('roles')
        .dropTableIfExists('individuals')
        .dropTableIfExists('families')
        .dropTableIfExists('zones')
        .dropTableIfExists('communities')
};
